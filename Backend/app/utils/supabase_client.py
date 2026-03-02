import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load the secret keys from the .env file
load_dotenv()

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_ANON_KEY")

# Initialize and export the client
supabase: Client = create_client(supabase_url, supabase_key)