import gameContext from 'app/context/game-context'
import { checkGameState, sleep } from 'app/helpers'
import gameService from 'app/services/gameService'
import socketService from 'app/services/socketService'
import { IPlayMatrix } from 'app/types'
import { View, Text, styled, Pressable, Row } from 'dripsy'
import { useContext, useEffect, useState } from 'react'

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const Board = styled(View)({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
  marginBottom: '50px',
})

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
  borderColor: '$primary',
  borderTopWidth: props.borderTop && '2px',
  borderBottomWidth: props.borderBottom && '2px',
  borderLeftWidth: props.borderLeft && '2px',
  borderRightWidth: props.borderRight && '2px',
}))

const Symbol = styled(Text)({
  fontSize: 100,
  color: '$text',
})

const Title = styled(Text)((props: any) => ({
  color: props.color ?? (props.disable ? '$textLight' : '$text'),
  fontWeight: '500',
  marginTop: '10px',
  fontSize: 20,
}))

const CenterView = styled(View)({
  alignItems: 'center',
})

export const initialMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export function GameBoard() {
  const [matrix, setMatrix] = useState<IPlayMatrix>(initialMatrix)

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
    score,
    gameResult,
    setGameResult,
    setScore,
  } = useContext(gameContext)

  const updateGameMatrix = async (
    column: number,
    row: number,
    symbol: 'x' | 'o'
  ) => {
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
        await sleep(500)
        gameService.gameWin(socketService.socket, 'The Game is a TIE!')
        setGameResult('The Game is a TIE!')
        setScore({ ...score, tie: score.tie + 1 })
      } else if (currentPlayerWon && !otherPlayerWon) {
        await sleep(500)
        gameService.gameWin(socketService.socket, 'You Lost!')
        setGameResult('You Won!')
        const symbol = playerSymbol === 'x' ? 'o' : 'x'
        setScore({ ...score, [symbol]: score[symbol] + 1 })
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
        const symbol = playerSymbol === 'x' ? 'o' : 'x'
        setScore({ ...score, [symbol]: score[symbol] + 1 })
      })
  }

  useEffect(() => {
    handleGameUpdate()
    handleGameStart()
    handleGameWin()
  }, [])

  return (
    <Container>
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
      {isGameStarted &&
        (!!gameResult ? (
          <Title color={gameResult.includes('Lost') ? '$red' : '$green'}>
            {gameResult}
          </Title>
        ) : isPlayerTurn ? (
          <Title color={'$green'}>YOUR TURN</Title>
        ) : (
          <Title color={'$red'}>OPPONENT TURN</Title>
        ))}

      <Board>
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
                      <Symbol>X</Symbol>
                    ) : (
                      <Symbol>O</Symbol>
                    )
                  ) : null}
                </Cell>
              ))}
            </RowContainer>
          )
        })}
      </Board>
      {isGameStarted ? (
        <Row
          sx={{
            width: '70%',
            justifyContent: 'space-between',
          }}
        >
          <CenterView>
            <Title disable={!(isPlayerTurn && playerSymbol === 'x')}>
              PLAYER 1 (x)
            </Title>
            <Title disable={!(isPlayerTurn && playerSymbol === 'x')}>
              {score.o}
            </Title>
          </CenterView>
          <CenterView>
            <Title disable={true}>TIE</Title>
            <Title disable={true}>{score.tie}</Title>
          </CenterView>
          <CenterView>
            <Title disable={!(isPlayerTurn && playerSymbol === 'o')}>
              PLAYER 2 (o)
            </Title>
            <Title disable={!(isPlayerTurn && playerSymbol === 'o')}>
              {score.x}
            </Title>
          </CenterView>
        </Row>
      ) : (
        <Title>Waiting for Other Player to Join to Start the Game!</Title>
      )}
    </Container>
  )
}
