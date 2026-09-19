"""
Supabase client configuration for INGRES AI
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("WARNING: Supabase credentials not found in environment variables")
    print("Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file")

supabase: Client = None

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✓ Supabase client initialized successfully")
except Exception as e:
    print(f"ERROR: Failed to initialize Supabase client: {e}")

def get_supabase() -> Client:
    """Get the Supabase client instance"""
    if supabase is None:
        raise Exception("Supabase client not initialized. Check your environment variables.")
    return supabase
