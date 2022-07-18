import gameContext from 'app/context/gameContext'
import { checkGameState } from 'app/helpers'
import gameService from 'app/services/gameService'
import socketService from 'app/services/socketService'
import { IPlayMatrix } from 'app/types'
import { View, Text, styled, Pressable, Row } from 'dripsy'
import { useContext, useEffect, useState } from 'react'

const PlayStopper = styled(View)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 99,
  cursor: 'default',
})

const RowContainer = styled(View)({
  width: '80%',
  flexDirection: 'row',
})

const Cell = styled(Pressable)((props: any) => ({
  width: 100,
  height: 120,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderColor: '#fff',
  borderTopWidth: props.borderTop && '2px',
  borderBottomWidth: props.borderBottom && '2px',
  borderLeftWidth: props.borderLeft && '2px',
  borderRightWidth: props.borderRight && '2px',
}))

const X = styled(Text)({
  fontSize: 100,
  color: '#fff',
})

const O = styled(Text)({
  fontSize: 100,
  color: '#fff',
})

const Title = styled(Text)((props: any) => ({
  color: props.color ?? (props.disable ? '#999999' : '#fff'),
  fontWeight: '500',
  marginTop: '10px',
  fontSize: 20,
}))

export function GameBoard() {
  const [gameResult, setGameResult] = useState('')
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
    score,
  } = useContext(gameContext)

  const updateGameMatrix = (column: number, row: number, symbol: 'x' | 'o') => {
    const newMatrix: any = [...matrix]

    if (newMatrix[row][column] === null || newMatrix[row][column] === 'null') {
      newMatrix[row][column] = symbol
      setMatrix(newMatrix)
    }

    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newMatrix)
      const [currentPlayerWon, otherPlayerWon] = checkGameState(
        newMatrix,
        playerSymbol
      )
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketService.socket, 'The Game is a TIE!')
        setGameResult('The Game is a TIE!')
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, 'You Lost!')
        setGameResult('You Won!')
      }

      setPlayerTurn(false)
    }
  }

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setMatrix(newMatrix)
        checkGameState(newMatrix, playerSymbol)
        setPlayerTurn(true)
      })
  }

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true)
        setPlayerSymbol(options.symbol)
        if (options.start) setPlayerTurn(true)
        else setPlayerTurn(false)
      })
  }

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false)
        setGameResult(message)
      })
  }

  useEffect(() => {
    handleGameUpdate()
    handleGameStart()
    handleGameWin()
  }, [])

  const onRestartGame = () => {
    setGameResult('')
  }

  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
      }}
    >
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
      {isGameStarted &&
        (!!gameResult ? (
          <Title color={gameResult.includes('Lost') ? 'red' : 'green'}>
            {gameResult}
          </Title>
        ) : isPlayerTurn ? (
          <Title color={'green'}>YOUR TURN</Title>
        ) : (
          <Title color={'red'}>OPPONENT TURN</Title>
        ))}

      <View
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        {matrix.map((row, rowIdx) => {
          return (
            <RowContainer key={`${rowIdx}-row`}>
              {row.map((column, columnIdx) => (
                <Cell
                  key={`${rowIdx}-col`}
                  borderRight={columnIdx < 2}
                  borderLeft={columnIdx > 0}
                  borderBottom={rowIdx < 2}
                  borderTop={rowIdx > 0}
                  onPress={() =>
                    updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                  }
                >
                  {column && column !== 'null' ? (
                    column === 'x' ? (
                      <X>X</X>
                    ) : (
                      <O>O</O>
                    )
                  ) : null}
                </Cell>
              ))}
            </RowContainer>
          )
        })}
        {!!gameResult && (
          <View
            sx={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              width: '80%',
              height: '100%',
              // zIndex: 99,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Pressable
              sx={{
                border: '2px solid #fff',
                padding: '10px',
                paddingTop: 0,
                borderRadius: '7px',
                backgroundColor: '#545454',
                zIndex: 10,
              }}
              onPress={() => onRestartGame()}
            >
              <Title>Click To Play Again!</Title>
            </Pressable>
          </View>
        )}
      </View>

      <View
        sx={{
          marginTop: '50px',
        }}
      />
      {isGameStarted ? (
        <Row
          sx={{
            width: '70%',
            justifyContent: 'space-between',
          }}
        >
          <View sx={{ alignItems: 'center' }}>
            <Title disable={!(isPlayerTurn && playerSymbol === 'x')}>
              PLAYER 1 (x)
            </Title>
            <Title disable={!(isPlayerTurn && playerSymbol === 'x')}>
              {score.o}
            </Title>
          </View>
          <View sx={{ alignItems: 'center' }}>
            <Title disable={true}>TIE</Title>
            <Title disable={true}>{score.tie}</Title>
          </View>
          <View sx={{ alignItems: 'center' }}>
            <Title disable={!(isPlayerTurn && playerSymbol === 'o')}>
              PLAYER 2 (o)
            </Title>
            <Title disable={!(isPlayerTurn && playerSymbol === 'o')}>
              {score.x}
            </Title>
          </View>
        </Row>
      ) : (
        <Title>Waiting for Other Player to Join to Start the Game!</Title>
      )}
    </View>
  )
}
