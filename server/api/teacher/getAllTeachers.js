import {serverSupabase} from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const supabase = serverSupabase(config)

    const { id } = getQuery(event)

    const { data, error } = await supabase
        .from('Teachers')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        }
    }

    return {
        success: true,
        data: data
    }
})