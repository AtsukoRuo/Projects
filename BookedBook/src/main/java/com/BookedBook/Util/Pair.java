package com.BookedBook.Util;

public class Pair<T, U> {
    private T firstPair;
    private U secondPair;

    public Pair(T firstPair, U secondPair) {
        this.firstPair = firstPair;
        this.secondPair = secondPair;
    }
    public T getfirstPair() {
        return firstPair;
    }

    public void setfirstPair(T firstPair) {
        this.firstPair = firstPair;
    }

    public U getSecondPair() {
        return secondPair;
    }

    public void setSecondPair(U secondPair) {
        this.secondPair = secondPair;
    }
}
