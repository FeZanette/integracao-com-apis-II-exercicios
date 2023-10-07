import React from "react";
import Playlists from "./componentes/Playlists/Playlists";

function App() {

  const headers = {
    headers: {
      Authorization: "fernanda-zanette-krexu",
    },
  };

  return <Playlists headers={headers}/>
}

export default App;
