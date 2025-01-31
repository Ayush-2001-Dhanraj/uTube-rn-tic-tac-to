import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import Cell from '../Cell';
import EntoTcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {BoardElement, MODE, ScoreInterface} from '../../constants';
import COLORS from '../../colors';
import WinnerText from '../WinnerText';

interface BoardInterface {
  boardElements: BoardElement[];
  winner: string;
  onPressCell: (index: number) => void;
  winningCombination: number[];
  isCross: boolean;
  disabled: boolean;
  currentMode: keyof typeof MODE;
  scores: ScoreInterface;
}

const Board = ({
  boardElements,
  winner,
  onPressCell,
  winningCombination,
  isCross,
  disabled,
  currentMode,
  scores,
}: BoardInterface) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{alignItems: 'center'}}>
        {winningCombination.length ? (
          <AntIcon size={40} color={COLORS.primary} name="smile-circle" />
        ) : winner ? (
          <FA5Icon size={40} color={COLORS.secondary} name="sad-cry" />
        ) : (
          <EntoTcon
            size={40}
            color={COLORS.primary}
            name={isCross ? 'cross' : 'circle'}
          />
        )}
      </View>

      <View style={{alignItems: 'center', padding: 8}}>
        {winner ? (
          <Text style={styles.infoTxt}>
            {currentMode == MODE.MULTI ? 'Round Completed' : 'Game Over'}
          </Text>
        ) : (
          <Text style={styles.infoTxt}>
            {currentMode.includes('BOT') && !isCross
              ? 'Bot is thinking...'
              : isCross
              ? `Cross's turn${currentMode.includes('BOT') ? ' (You)' : ''}`
              : "Circle's Turn"}
          </Text>
        )}
      </View>

      <View
        style={{
          backgroundColor: '#000',
          padding: 4,
          height: 300,
          width: 300,
          elevation: 8,
          position: 'relative',
        }}>
        <FlatList
          numColumns={3}
          data={boardElements}
          keyExtractor={(_, index) => index as unknown as string}
          contentContainerStyle={styles.boardBox}
          columnWrapperStyle={styles.boardBox}
          renderItem={({item, index}) => {
            const fillColor =
              winner === 'Draw'
                ? COLORS.secondary
                : winningCombination.includes(index)
                ? COLORS.main
                : COLORS.primary;

            return (
              <Cell
                name={item}
                handlePress={() => {
                  onPressCell(index);
                }}
                disabled={!!winner || disabled}
                fillColor={fillColor}
                iconColor={
                  fillColor === COLORS.main ? COLORS.primary : COLORS.main
                }
              />
            );
          }}
        />
        <Image
          source={require('../../assets/images/claws_sample_1.png')}
          style={[styles.clawImage, styles.topClaw]}
        />
        <Image
          source={require('../../assets/images/claws_sample_3.png')}
          style={[styles.clawImage, styles.bottomClaw]}
        />
      </View>

      <WinnerText winner={winner} scores={scores} currentMode={currentMode} />
    </View>
  );
};

export default Board;
