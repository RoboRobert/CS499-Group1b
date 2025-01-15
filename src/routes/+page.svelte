<script lang="ts">
    import { Client } from "pg";

    const client = new Client({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "lol",
        database: "template1", // Replace with your database name
    });

    async function queryDatabase() {
        try {
            // Connect to the PostgreSQL server
            await client.connect();

            // Run the SQL query
            const res = await client.query(
                "SELECT * FROM people WHERE first_name = $1 AND last_name = $2",
                ["John", "Smith"],
            );

            // Store the result in a variable
            const result = res.rows; // Holds the rows returned by the query

            console.log("Query Result:", result); // Log the result

            return result;
        } catch (err: any) {
            console.error("Error executing query", err.stack);
        } finally {
            // Close the database connection
            await client.end();
        }
    }

    // Call the function to run the query
    queryDatabase();
</script>

<form>
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="submit" />
</form>
