package com.BookedBook.POJO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Time;
import java.sql.Timestamp;

public class BorrowingRecord {
    private int id;
    private int book_id;
    private String name;
    private String student_id;
    private String contact;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp time_out;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp time_back;
    private int status_back;
    private String info;
    public BorrowingRecord() {}
    public BorrowingRecord(int id, int book_id, String name, String student_id, String contact, Timestamp time_out, Timestamp time_back, int status_back, String info) {
        id = id;
        this.book_id = book_id;
        this.name = name;
        this.student_id = student_id;
        this.contact = contact;
        this.time_out = time_out;
        this.time_back = time_back;
        this.status_back = status_back;
        this.info = info;
    }

    public int getid() {
        return id;
    }

    public void setid(int id) {
        this.id = id;
    }

    public int getBook_Id() {
        return book_id;
    }

    public void setBook_Id(int book_id) {
        this.book_id = book_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudent_id() {
        return student_id;
    }

    public void setStudent_id(String student_id) {
        this.student_id = student_id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Timestamp getTime_out() {
        return time_out;
    }

    public void setTime_out(Timestamp time_out) {
        this.time_out = time_out;
    }

    public Timestamp getTime_back() {
        return time_back;
    }

    public void setTime_back(Timestamp time_back) {
        this.time_back = time_back;
    }

    public int getStatus_back() {
        return status_back;
    }

    public void setStatus_back(int status_back) {
        this.status_back = status_back;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "BorrowingRecord{" +
                "id=" + id +
                ", book_id=" + book_id +
                ", name='" + name + '\'' +
                ", student_id='" + student_id + '\'' +
                ", contact='" + contact + '\'' +
                ", time_out=" + time_out +
                ", time_back=" + time_back +
                ", status_back=" + status_back +
                ", info='" + info + '\'' +
                '}';
    }
}
