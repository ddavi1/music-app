package com.music.API.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "artists")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipMusic {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String music;
    private String artist;


    public String getMusic() {
        return music;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setMusic(String music) {
        this.music = music;
    }
}
