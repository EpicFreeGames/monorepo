import { useQuery } from "@tanstack/react-query";
import { IGame } from "~types";
import { ApiError, apiRequest } from "../api";

const fetchGames = () => apiRequest<IGame[]>("/games", "GET");

export const useGames = () => useQuery<IGame[], ApiError>(["games"], fetchGames);
