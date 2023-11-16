const isLocalhost = true;

export const apiConfig = {
  protocol: isLocalhost ? "http" : "https",
  host: isLocalhost ? "localhost" : "psgenaipoc.azurewebsites.net",
  port: isLocalhost ? ":5000" : "",
  keys: {
    session: isLocalhost
      ? "dummy_functions_key"
      : "pGICeTW8-Kt1plYy_zmM-TQRne-zii9b7e0F3Ze-tsHrAzFuQRxpSA==",
    message: isLocalhost
      ? "dummy_functions_key"
      : "EVGq_ly41Tk0Dfyk6QDYDQ9NGWdy6OgL7A4T31pw4HAJAzFuw5DsyQ==",
    actions: isLocalhost
      ? "dummy_functions_key"
      : "SqAxEfz8hiw0j66R9MDbfyDBCxZ5FsaOp1fB1k3ZCoSTAzFu-oFwmQ==",
  },
};

export const apiConfigIngest = {
  protocol: isLocalhost ? "http" : "https",
  host: isLocalhost ? "localhost" : "genaipocmttest.azurewebsites.net",
  port: isLocalhost ? ":5000" : "",
  keys: {
    upload: isLocalhost
      ? "dummy_functions_key"
      : "8L4WjVMsAvVWz40QiiIVoKl_5BtkFXmUikDb4171LmfjAzFuZUnTXQ==",
    crawl: isLocalhost
      ? "dummy_functions_key"
      : "8L4WjVMsAvVWz40QiiIVoKl_5BtkFXmUikDb4171LmfjAzFuZUnTXQ==",
  },
};
