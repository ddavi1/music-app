package com.music.API.repository;

import com.music.API.entity.ShipMusic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<ShipMusic, Long> {
}
