<script lang="ts" context="module">
    export async function load({ params }) {
        const teamId = params.teamId;
        return  { teamId };
    }
</script>

<script lang="ts">
    export let teamId: string;
</script>

<title>Team {teamId}</title>

<div>
    <h1>Team {teamId} Details</h1>
    <p>This is the detailed page for Team {teamId}.</p>
    
</div>