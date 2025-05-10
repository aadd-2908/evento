package com.eventmaster.controllers;

import com.eventmaster.dto.TicketPurchaseRequest;
import com.eventmaster.dto.TicketResponse;
import com.eventmaster.entities.User;
import com.eventmaster.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<TicketResponse>> getUserTickets(
            @AuthenticationPrincipal User user
    ) {
        List<TicketResponse> tickets = ticketService.getTicketsByUser(user);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseTicket(
            @Valid @RequestBody TicketPurchaseRequest request,
            @AuthenticationPrincipal User user
    ) {
        try {
            TicketResponse ticket = ticketService.purchaseTicket(request, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(ticket);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        try {
            TicketResponse ticket = ticketService.getTicketById(id, user);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Ticket not found"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelTicket(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        try {
            ticketService.cancelTicket(id, user);
            return ResponseEntity.ok(Map.of("message", "Ticket canceled successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TicketResponse>> getTicketsByEvent(
            @PathVariable Long eventId,
            @AuthenticationPrincipal User user
    ) {
        List<TicketResponse> tickets = ticketService.getTicketsByEvent(eventId, user);
        return ResponseEntity.ok(tickets);
    }
}