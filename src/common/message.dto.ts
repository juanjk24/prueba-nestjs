export class MessageDto {
    message: String[] = []

    constructor(message: string) {
        this.message[0] = message
    }
}