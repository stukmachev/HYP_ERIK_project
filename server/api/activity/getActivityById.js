import {serverSupabase} from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const supabase = serverSupabase(config)
    const query = getQuery(event)
    const activityId = query.id
    const { data, error } = await supabase
        .from('Activities')
        .select('*')
        .eq('id', activityId)
        .single()

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