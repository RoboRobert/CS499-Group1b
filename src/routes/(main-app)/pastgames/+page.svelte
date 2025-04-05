<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<title>Past Games</title>

<div>
  <section class="past-games-dash">
    <h1>Past Games</h1>
    <h3>A List of All Published Games</h3>
  </section>

  <section class="list-section-1">
    <div>
      <h1>Past Games</h1>
    </div>
    <div class="team-bars">
      {#each data.games as game}
        <div class="team-bar">
          <a href="/pastgames/{game.game_id}" class="team-link">
            <h3>{game.hometeam} vs. {game.awayteam}</h3>
            <h3>{game.homescore}-{game.awayscore}</h3>
            <h3>{game.date} {game.time}</h3>
          </a>
        </div>
      {/each}
    </div>
  </section>
</div>
