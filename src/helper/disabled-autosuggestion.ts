export function disabledAutosuggestion(event: React.FocusEvent<HTMLElement>) {
    return event.target.setAttribute('autocomplete', 'whatever');
}
