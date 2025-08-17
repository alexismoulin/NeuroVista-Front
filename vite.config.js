import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
    // load .env files based on the current mode
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@/data": env.VITE_MODE === "Prod"
                    ? "/src/helpers/data.js"
                    : "/src/helpers/data_mockup.js"
            }
        }
    }
})