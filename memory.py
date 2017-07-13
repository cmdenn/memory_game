#!/usr/bin/env python
from random import randint


def play():
    print 'Welcome to the memory game!'
    rows = get_rows()
    board = create_board(rows)
    cards = create_cards(rows)
    revealed = []
    tries = 0
    while True:
        board, revealed = take_guesses(board, cards, revealed, rows)
        tries += 1
        if '*' not in board:
            break
        print 'Updated board:\n' + board
    print 'Success! You completed the game in {} tries'.format(tries)


def get_rows():
    '''Prompt user for number of rows.'''
    print 'Should the board have 2, 4, or 6 rows?'
    while True:
        rows = raw_input('> ')
        if rows in ['2', '4', '6']:
            break
        print 'Please choose 2, 4, or 6.'
    return int(rows)


def create_board(rows):
    '''Build the board as a string.'''
    board = ''
    for r in range(rows-1):
        board += '* '*(rows-1) + '*\n'
    board += '* '*(rows-1) + '*'
    print 'Okay, here\'s your board:\n' + board
    return board


def create_cards(rows):
    '''Store pairs of random letters at random indices in a list.'''
    spaces = rows**2
    alpha = 'abcdefghijklmnopqrstuvwxyz'
    deck = []
    cards = []
    for i in range(spaces/2):
        deck.append(alpha[i])
        deck.append(alpha[i])
    for r in range(rows):
        new_row = []
        for c in range(rows):
            card = randint(0, len(deck)-1)
            new_row.append(deck[card])
            deck = deck[:card] + deck[card+1:]
        cards.append(new_row)
    for row in cards:
        print row
    return cards


def take_guesses(board, cards, revealed_cards, rows):
    '''Take user guesses and reveal the corresponding cards'''
    while True:
        guess1 = get_guess(rows)
        if guess1 not in revealed_cards:
            break
        print 'You\'ve already guessed that!'
    guess_board = update(guess1, board, cards)
    print 'First card:\n' + guess_board
    while True:
        guess2 = get_guess(rows)
        if guess2 != guess1 and guess2 not in revealed_cards:
            break
        print 'You\'ve already guessed that!'
    guess_board = update(guess2, guess_board, cards)
    print 'Second card:\n' + guess_board
    if cards[guess1[0]][guess1[1]] == cards[guess2[0]][guess2[1]]:
        print 'It\'s a match!'
        board = guess_board
        revealed_cards.append(guess1)
        revealed_cards.append(guess2)
    else:
        print 'No match.'
    return board, revealed_cards


def get_guess(rows):
    '''Prompt user for a guess.'''
    print 'Which card would you like to turn over?'
    r = get_coord('row', rows)
    c = get_coord('column', rows)
    index = [r, c]
    return index


def get_coord(kind, rows):
    '''Get a row or column from user'''
    while True:
        coord = raw_input('{}: '.format(kind))
        if coord in [str(i) for i in range(1, rows+1)]:
            coord = int(coord) - 1
            break
        print 'Please choose a {} between 1 and {}'.format(kind, rows)
    return coord


def update(guess, board, cards):
    '''Update the board'''
    r = guess[0]
    c = guess[1]
    index = (r*len(cards)*2 + c*2)
    new_board = board[:index] + cards[r][c] + board[index+1:]
    return new_board


if __name__ == '__main__':
    play()
