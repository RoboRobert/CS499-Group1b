// src/svelte.d.ts
// check if project is up to date with main branch
declare module '*.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    export default class Component extends SvelteComponentTyped<any, any, any> {}
  }