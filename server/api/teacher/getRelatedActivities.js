import {serverSupabase} from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const supabase = serverSupabase(config)

    const { id } = getQuery(event)

    const { data, error } = await supabase
        .from('TeachersActivity')
        .select(`
        Activities (
          id,
          name,
          description,
          photos,
          highlighted
        )
      `).eq('teacher_id', id)

    if (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        }
    }

    return {
        success: true,
        data: data ?? []
    }
})