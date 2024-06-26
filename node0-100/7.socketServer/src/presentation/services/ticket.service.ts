import { ok } from "assert";
import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { WssService } from "./wss.service";

export class TicketService {

    constructor(
        private readonly wssService = WssService.instance
    ) {
    }

    public tickets: Ticket[] = [
        // { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: false },
        // { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: false },
        // { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
        // { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
        // { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
        // { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false }
    ]

    private readonly workingOnTickets: Ticket[] = [];

    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.handleAtDesk)
    }

    public get lastWorkingOnTickets(): Ticket[] {
        return this.workingOnTickets.slice(0, 4);
    }

    public get lastTicketNumber(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
    }

    public createTicket() {
        const ticket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createAt: new Date(),
            done: false,
            handleAt: undefined,
            handleAtDesk: undefined
        }
        this.tickets.push(ticket)
        this.onTicketNumberChanged();
        return ticket;

    }

    public drawTicket(desk: string) {
        const ticket = this.tickets.find(tick => !tick.handleAtDesk);
        if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' }
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({ ...ticket })
        this.onTicketNumberChanged();
        this.onWorkingOnChange();

        return { status: ok, ticket }
    }

    public onFinishedTicket(id: string) {
        const ticket = this.tickets.find(ticket => ticket.id === id);
        if (!ticket) return { status: 'error', message: 'Ticket no encontrado' }
        this.tickets = this.tickets.map(ticket => {
            if (ticket.id === id) {
                ticket.done = true;
            }
            return ticket;
        })
        return { status: 'ok' }
    }

    private onTicketNumberChanged() {
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
    }

    private onWorkingOnChange() {
        this.wssService.sendMessage('on-working-changed', this.lastWorkingOnTickets)
    }

}