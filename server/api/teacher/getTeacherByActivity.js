import {serverSupabase} from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const supabase = serverSupabase(config)
    const query = getQuery(event)
    const activityId = query.id
    const { data, error } = await supabase
        .from('TeachersActivity')
        .select(`
        timetable,
        Teachers (
          id,
          name,
          surname,
          photos
        )
      `)
        .eq('activity_id', activityId)

    if (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        }
    }

    return {
        success: true,
        data: data ?? [],
        error: null
    }
})