package com.BookedBook.POJO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Time;
import java.sql.Timestamp;

public class BookRecord {
    private int id;
    private String title;
    private Timestamp time_issue;
    private int num_word;
    private double price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Timestamp time_in;
    private int status;
    private String author;
    private String img_src;

    public String getImg_src() {
        return img_src;
    }

    public void setImg_src(String img_src) {
        this.img_src = img_src;
    }

    public BookRecord() {}

    public BookRecord(int id, String title, Timestamp time_issue, int num_word, double price, Timestamp time_in, int status, String author, String img_src) {
        id = id;
        this.title = title;
        this.time_issue = time_issue;
        this.num_word = num_word;
        this.price = price;
        this.time_in = time_in;
        this.status = status;
        this.author = author;
        this.img_src = img_src;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Timestamp getTime_issue() {
        return time_issue;
    }

    public void setTime_issue(Timestamp time_issue) {
        this.time_issue = time_issue;
    }

    public int getNum_word() {
        return num_word;
    }

    public void setNum_word(int num_word) {
        this.num_word = num_word;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Timestamp getTime_in() {
        return time_in;
    }

    public void setTime_in(Timestamp time_in) {
        this.time_in = time_in;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "BookRecord{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", time_issue=" + time_issue +
                ", num_word=" + num_word +
                ", price=" + price +
                ", time_in=" + time_in +
                ", status=" + status +
                ", author='" + author + '\'' +
                ", img_src='" + img_src + '\'' +
                '}';
    }

    public void setValueByName(String key, String value) {
        if (key.equals("title")) {
            this.title = (String) value;
        } else if (key.equals("time_issue")) {
            this.time_issue = Timestamp.valueOf(value);
        } else if (key.equals("num_word")) {
            this.num_word = Integer.parseInt(value);
        } else if (key.equals("price")) {
            this.price = Double.parseDouble(value);
        } else if (key.equals("time_in")) {
            this.time_in = Timestamp.valueOf(value);
        } else if (key.equals("status")) {
            this.status = Integer.parseInt(value);
        } else if (key.equals("author")) {
            this.author = (String) value;
        }
    }

}
