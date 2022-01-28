import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import appConfig from '../config.json';

function confereUserName(nome) {
  if (nome.length >= 2) {
    return true;
  } else {
    return false;
  }
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();
  const [gitApi, setGitApi] = React.useState('');

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',

          backgroundPosition: 'center center',
          backgroundImage: 'url(https://images3.alphacoders.com/707/707551.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '80%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >

          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infoEvent) {
              infoEvent.preventDefault();
              roteamento.push(`\chat?username=${username}`);

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function handler(event) {
                //guarda nome digitado pelo usuario
                const valor = event.target.value;
                //muda username para o nome digitado
                setUsername(valor);

                fetch(`https://api.github.com/users/${valor}`)
                  .then(function (resposta) {
                    return resposta.json();
                  })
                  .then(function (respostaAtt) {
                    setGitApi(respostaAtt);
                    console.log(gitApi);
                  })
              }}
              placeholder='Digite seu usuário do Github (min. 2 char)'
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: '#2D68C8',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <BotaoEntrar name={username}> </BotaoEntrar>
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <ImagemDePerfil name={username} api={gitApi}> </ImagemDePerfil>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
              color: ${appConfig.theme.colors.neutrals["000"]};
              font-size: 24px;
              font-weight: 600;
            }
          `}</style>
    </>
  );
}


function BotaoEntrar(props) {
  if (confereUserName(props.name)) {
    return (
      <>
        <Button
          type="submit"
          label="Entrar"
          fullWidth
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: '#2A62B7',
            mainColorLight: '#2D68C8',
            mainColorStrong: '#173564',
          }}
        />
      </>
    );
  }

  return (
    <>
      <Button
        type="submit"
        label="Entrar"
        disabled
        fullWidth
        buttonColors={{
          contrastColor: appConfig.theme.colors.neutrals["000"],
          mainColor: '#2A62B7',
          mainColorLight: '#2D68C8',
          mainColorStrong: '#173564',
        }}
      />
    </>
  );
}

function ImagemDePerfil(props) {
  if (confereUserName(props.name)) {
    return (
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '200px',
          padding: '16px',
          backgroundColor: appConfig.theme.colors.neutrals[800],
          border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals[999],
          borderRadius: '10px',
          flex: 1,
          minHeight: '240px',
        }}
      >
        <Image
          styleSheet={{
            borderRadius: '50%',
            marginBottom: '16px',
          }}
          src={`https://github.com/${props.name}.png`}
        />

        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[200],
            backgroundColor: appConfig.theme.colors.neutrals[900],
            padding: '3px 10px',
            borderRadius: '1000px'
          }}
        >
          {props.name}
        </Text>
        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[200],
            backgroundColor: appConfig.theme.colors.neutrals[900],
            padding: '3px 10px',
            borderRadius: '1000px'
          }}
        >
          Seguidores: {props.api.followers}
        </Text>
        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[200],
            backgroundColor: appConfig.theme.colors.neutrals[900],
            padding: '3px 10px',
            borderRadius: '1000px'
          }}
        >
          Repositórios: {props.api.public_repos}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        padding: '16px',
        backgroundColor: appConfig.theme.colors.neutrals[800],
        border: '1px solid',
        borderColor: appConfig.theme.colors.neutrals[999],
        borderRadius: '10px',
        flex: 1,
        minHeight: '240px',
      }}
    >
      <Image
        styleSheet={{
          borderRadius: '50%',
          marginBottom: '16px',
        }}
        src={'https://i.pinimg.com/564x/0a/dc/af/0adcafe5538409b77870271287c93098.jpg'}
      />
    </Box>
  );
}