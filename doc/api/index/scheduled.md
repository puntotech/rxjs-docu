# scheduled

<h2 class="subtitle">Coonvierte un tipo ObservableInput común a un Observable cuya suscripción y emisiones se planifican con el Planificador proporcionado</h2>

### Firma

`scheduled<T>(input: any, scheduler: SchedulerLike): Observable<T>`

## Parámetros

<table>
<tr><td>input</td><td>El Observable, Array, Promise, Iterable etc. que se desea planificar.</td></tr>
<tr><td>scheduler</td><td>El Planificador que se utilizará para planificar la suscripción y las emisiones del Observable retornado.</td></tr>
</table>

### Retorna

`Observable<T>`

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/scheduled/scheduled.ts#L10-L36">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/function/scheduled">Documentación oficial en inglés</a>
