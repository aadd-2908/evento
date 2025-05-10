package com.eventmaster.controllers;

import com.eventmaster.dto.EventRequest;
import com.eventmaster.dto.EventResponse;
import com.eventmaster.entities.Event;
import com.eventmaster.entities.User;
import com.eventmaster.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        List<EventResponse> events = eventService.getAllEvents(category, search);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        try {
            EventResponse event = eventService.getEventById(id);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Event not found"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createEvent(
            @Valid @RequestBody EventRequest eventRequest,
            @AuthenticationPrincipal User user
    ) {
        try {
            EventResponse createdEvent = eventService.createEvent(eventRequest, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest eventRequest,
            @AuthenticationPrincipal User user
    ) {
        try {
            EventResponse updatedEvent = eventService.updateEvent(id, eventRequest, user);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        try {
            eventService.deleteEvent(id, user);
            return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/organizer")
    public ResponseEntity<List<EventResponse>> getOrganizerEvents(
            @AuthenticationPrincipal User user
    ) {
        List<EventResponse> events = eventService.getEventsByOrganizer(user);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<EventResponse>> getFeaturedEvents() {
        List<EventResponse> events = eventService.getFeaturedEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventResponse>> getUpcomingEvents() {
        List<EventResponse> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
}