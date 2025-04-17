import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import dns from "node:dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [sveltekit()],
  preview: {
    port: 8080
  },
  server: {
    strictPort: true,
    port: 8080,
    hmr: {
      clientPort: 80,
    },
    allowedHosts: ["ec2-3-136-29-133.us-east-2.compute.amazonaws.com"],
  },
});
