<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<title>Team {data.game.game_id}</title>

<div>
  <!-- <a href="./">Back</a> -->
  <section class="game-dash">
    <h3>{data.game.hometeam} vs. {data.game.awayteam}</h3>
    <h3>{data.game.homescore}-{data.game.awayscore}</h3>
    <h3>{data.game.date} {data.game.time}</h3>
  </section>
  <section class="list-section-1">
    {#each data.scoresheets as scoresheet, i}
      <a data-sveltekit-reload href="/sheets/{scoresheet.sheet_id}">
        <div class="game">
          <h3>Scoresheet by {scoresheet.scorekeeper}</h3>
        </div>
      </a>
    {/each}
  </section>
</div>
