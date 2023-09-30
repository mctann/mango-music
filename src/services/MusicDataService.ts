import apiClient from "@/http-common";
import Music from "@/types/Music";

class MusicDataService {
  async getAll({ searchTerm } : { searchTerm: string }): Promise<Music[]> {
    try {
      const response = await apiClient.get(`/search?term=${searchTerm}&media=music&entity=musicTrack`);
      return response.data.results as Music[];
    } catch (error) {
      throw new Error("Error fetching music tracks");
    }
  }
}

export default new MusicDataService();