# Funcionalidades obsoletas

La API listada a continuación será eliminada de la próxima versión mayor (X.0.0):

<table>
<tr><td>Scheduler</td><td> 	Scheduler es una implementación interna de RxJS, y no debe usarse directamente. En su lugar, se debe crear una clase propia e implementar SchedulerLike</td></tr>
<tr><td>NotificationKind</td><td> 	NotificationKind está obsoleto, ya que los <i>const enums</i> no son compatibles con módulos aislados. Utilizar un <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/template_strings">literal de cadena</a> en su lugar.</td></tr>
<tr><td>empty</td><td> 	Obsoleto. Utilizar la constante EMPTY, o scheduled (ej: `scheduled([], scheduler)` en su lugar)</td></tr>
<tr><td>never</td><td> 	Obsoleto. Utilizar la constante NEVER en su lugar.</td></tr>
<tr><td>ObservableLike</td><td> Usar InteropObservable</td></tr>
<tr><td>combineLatest</td><td> 	Obsoleto. Utilizar <a href="/operators/combination/combineLatest">combineLatest</a> en su lugar.</td></tr>
<tr><td>concat</td><td> 	Obsoleto. Utilizar <a href="/operators/combination/concat">concat</a> estático en su lugar.</td></tr>
<tr><td>merge</td><td> 	Obsoleto. Utilizar <a href="/operators/combination/merge">merge</a> estático en su lugar.</td></tr>
<tr><td>partition</td><td> 	Utilizar la función estática <a href="/operators/transformation/partition">partition</a> en su lugar.</td></tr>
<tr><td>race</td><td> 	Obsoleto. Utilizar <a href="/operators/combination/race">race</a> estático en su lugar.</td></tr>
<tr><td>zip</td><td> 	Obsoleto. Utilizar <a href="/operators/combination/zip">zip</a> estático en su lugar </td></tr>
</table>
