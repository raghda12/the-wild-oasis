import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rbcxboaviomaahlyyzgq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiY3hib2F2aW9tYWFobHl5emdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5Mzk3ODEsImV4cCI6MjA5MjUxNTc4MX0.6iBClLhw3bCLaJe9xSKl42438hotbapBcNOCPoaudDE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
