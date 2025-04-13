<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<title>Home Page</title>

<div class="container">
  <div class="roster-page">
    <section class="home-dash">
      <!-- <img class="smegol" src="/LOGO.png" alt="Project Logo"/> -->
      <img class="smegol" src="/LOGO_NO_LEGS.png" alt="Project Logo" />
      <h1>SMEGOL</h1>
      <h3>Stats Made Easy, Game Operator's Log</h3>
    </section>

    <section class="list-section-1">
      <h2>Recent Games</h2>
      <div class="team-bars">
        {#each data.games.slice(0, 5) as game}
          <div class="team-bar">
            <a href="/pastgames/{game.game_id}" class="team-link">
              <h3>{game.hometeam} vs. {game.awayteam}</h3>
              <p>{game.homescore}-{game.awayscore}</p>
              <p>{game.date} {game.time}</p>
            </a>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .smegol {
    width: 400px;
  }
</style>
