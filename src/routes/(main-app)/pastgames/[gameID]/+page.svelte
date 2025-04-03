<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let currentGame = data.game;
  let gameScoresheets = data.scoresheets;
</script>

<title>Team {currentGame.gameid}</title>

<div>
  <a href="./">Back</a>
  <section class="game-dash">
    <h1>Game {currentGame.gameid} Details</h1>
    <p>This is the detailed page for game {currentGame.gameid}.</p>
  </section>
  <section class="list-section-1">
    {#each gameScoresheets as scoresheet, i}
      <a data-sveltekit-reload href="/sheets/{scoresheet.sheet_id}">
        <div class="game">
          <h3>Scoresheet #{scoresheet.sheet_id}</h3>
        </div>
      </a>
    {/each}
  </section>
</div>
