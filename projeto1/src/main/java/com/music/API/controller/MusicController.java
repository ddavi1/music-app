package com.music.API.controller;


import com.music.API.entity.ShipMusic;
import com.music.API.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/musicas")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MusicController {

    @Autowired
    private MusicRepository repository;

    @GetMapping
    public List<ShipMusic> getMusic() {
        return repository.findAll();
    }

    @PostMapping
    public void setMusic(@RequestBody ShipMusic music) {
        repository.save(music);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateMusic(@PathVariable Long id, @RequestBody ShipMusic updatedMusic) {
        Optional<ShipMusic> musicOptional = repository.findById(id);

        if (musicOptional.isPresent()) {
            ShipMusic existingMusic = musicOptional.get();
            existingMusic.setArtist(updatedMusic.getArtist()); // Se existir um campo artist a ser atualizado
            existingMusic.setMusic(updatedMusic.getMusic()); // Atualiza o campo music

            repository.save(existingMusic);
            return ResponseEntity.ok("Música atualizada com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public void deleteMusic(@PathVariable Long id) {
        repository.deleteById(id);

    }

}