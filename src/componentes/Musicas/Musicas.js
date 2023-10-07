import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";

// DADOS MOCKADOS QUE DEVEM SER APAGADOS. OS NOVOS DADOS DEVEM VIR DA API
// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([props.playlist]);
//   CRIAR ESTADOS PARA OS INPUTS CONTROLADOS QUE VÃO NO BODY:
  const [musicName, setMusicName] = useState("")
  const [artist, setArtist] = useState("")
  const [url, setUrl] = useState("")

  const body = {
    name: musicName,
    artist: artist,
    url: url
  }

//   FUNÇÃO QUE VERIFICA/PEGA AS MÚSICAS DE UMA DETERMINADA PLAYLIST
  const getPlaylistTracks = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        props.headers
      )
      .then((response) => {
        console.log(response.data.result.tracks);
        setMusicas(response.data.result.tracks);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  //  PARA RENDERIZAR A FUNÇÃO NA TELA
  useEffect(() => {
    getPlaylistTracks();
  }, []);

// FUNÇÃO QUE ADICIONA MÚSICA EM UMA PLAYLIST EXISTENTE
const addTrackToPlaylist = () => {
    axios
    .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, props.headers)
    .then(() => {
       alert ("Música adicionada com sucesso!")
       setArtist("")
       setMusicName("")
       setUrl("")
       getPlaylistTracks()
    })
    .catch((error) => {
        console.log(error.response);
    })
}

// FUNÇÃO QUE DELETA MÚSICA EM UMA PLAYLIST EXISTENTE
const removeTrackFromPlaylist = (param) => {
    axios
    .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${param}`, props.headers)
    .then(() => {
       alert ("Música removida")
       getPlaylistTracks()
    })
    .catch((error) => {
        console.log(error.response);
    })
}

console.log(musicas);

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      <button onClick={() => {props.deletePlaylist(props.playlist.id)}}>Deletar playlist</button>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => {removeTrackFromPlaylist(musica.id)}}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        {/* COLOCAR value E FUNÇÃO onChange PARA OS INPUTS CONTROLADOS QUE ESTÃO NO BODY */}
        <InputMusica value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="artista" />
        <InputMusica value={musicName} onChange={(e) => setMusicName(e.target.value)} placeholder="musica" />
        <InputMusica value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url" />
        <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
