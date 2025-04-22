export interface Team {
  team_id: string; //Player Inherits
  team_name: string;
  hometown: string;
  state: string;
  coach: string;
}

export interface Player {
  team_id: string; //Inherited from Team
  player_id: string;
  team_name: string;
  player_name: string;
  player_number: number;
  position: string;
  player_class: string;
  hometown: string;
  state: string;
  height_feet: number;
  height_inches: number;
  weight: number;
  num_games: number;
  attempted_shots: number;
  failed_shots: number;
  goals: number; 
  assists: number;
  ground_balls: number;
}
