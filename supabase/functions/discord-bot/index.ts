import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { 
  createBot, 
  startBot, 
  Intents,
  Message
} from 'https://deno.land/x/discordeno@13.0.0/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Initialize Discord bot
    const DISCORD_BOT_TOKEN = Deno.env.get('DISCORD_BOT_TOKEN')
    if (!DISCORD_BOT_TOKEN) {
      throw new Error('Missing Discord bot token')
    }

    // Create bot instance
    const bot = createBot({
      token: DISCORD_BOT_TOKEN,
      intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
      events: {
        ready: () => {
          console.log("Successfully connected to Discord!")
        },
        messageCreate: async (message: Message) => {
          if (message.isFromBot) return

          // Fetch available commands from database
          const { data: commands } = await supabaseClient
            .from('bot_commands')
            .select('*')
            .eq('enabled', true)

          if (!commands) return

          // Check if message starts with any command
          for (const command of commands) {
            if (message.content.startsWith(`!${command.name}`)) {
              // Log command usage
              await supabaseClient
                .from('command_logs')
                .insert({
                  command_id: command.id,
                  user_id: message.authorId.toString(),
                  username: message.author.username,
                })

              // Handle specific commands
              switch (command.name) {
                case 'ping':
                  await message.reply('Pong! 🏓')
                  break
                case 'help':
                  const helpText = commands
                    .map(cmd => `**!${cmd.name}**: ${cmd.description}`)
                    .join('\n')
                  await message.reply(`Available commands:\n${helpText}`)
                  break
                case 'info':
                  await message.reply(`Server: ${message.guild?.name}\nMembers: ${message.guild?.memberCount}`)
                  break
                default:
                  await message.reply(`Executing command: ${command.name}`)
              }
              break
            }
          }
        }
      }
    })

    // Start the bot
    await startBot(bot)

    return new Response(
      JSON.stringify({ message: 'Discord bot is running' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})