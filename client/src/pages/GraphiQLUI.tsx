import { GraphiQLProvider, ToolbarButton } from "@graphiql/react";
import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useExplorerPlugin } from "@graphiql/plugin-explorer";
import { useState } from "react";

const fetcher = createGraphiQLFetcher({
  url: "http://127.0.0.1:1337/graphql",
});

import "@graphiql/plugin-explorer/dist/style.css"
import "graphiql/graphiql.css";

function GraphiQLUI() {

  const [query, setQuery] = useState('');

  const explorerPlugin = useExplorerPlugin({
    query,
    onEdit: setQuery
  })

  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="flex h-screen">
        <GraphiQL query={query} onEditQuery={setQuery} plugins={[explorerPlugin]} fetcher={fetcher} />
      </div>
    </GraphiQLProvider>
  );
}

export default GraphiQLUI;
