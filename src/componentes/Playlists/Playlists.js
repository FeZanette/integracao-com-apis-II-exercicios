import React, { useCallback, useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

// DADOS MOCKADOS QUE DEVEM SER APAGADOS. OS NOVOS DADOS DEVEM VIR DA API
// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]
function Playlists(props) {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const { headers } = props;

  //   const headers = {
  //     headers: {
  //       Authorization: "fernanda-zanette-krexu",
  //     },
  //   };

  const getAllPlaylists = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        props.headers
      )
      .then((response) => {
        console.log(response.data.result.list);
        setPlaylists(response.data.result.list);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getAllPlaylists();
  }, []);

  const searchPlaylist = async () => {
    try {
      const res = await axios.get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${name}`,
        props.headers
      );
      setPlaylists(res.data.result.playlist);
      // console.log(res.data.result.playlist);
    } catch (error) {
      console.log(error.response);
    }
  };
  // searchPlaylist();

  const deletePlaylist = async (id) => {
    try {
      await axios.delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
        props.headers
      );
      alert("Playlist excluída com sucesso!");
      getAllPlaylists();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome da playlist"
      />
      <button onClick={searchPlaylist}>Pesquisar</button>
      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            headers={headers}
            deletePlaylist={deletePlaylist}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
