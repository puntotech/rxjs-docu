# Funcionalidades obsoletas

¡La API listada a continuación será eliminada de la próxima versión mayor!

<table>
<tr><td>Scheduler</td><td> 	Scheduler is an internal implementation detail of RxJS, and should not be used directly. Rather, create your own class and implement SchedulerLike</td></tr>
<tr><td>NotificationKind</td><td> 	NotificationKind is deprecated as const enums are not compatible with isolated modules. Use a string literal instead.</td></tr>
<tr><td>empty</td><td> 	Deprecated in favor of using EMPTY constant, or scheduled (e.g. `scheduled([], scheduler)`)</td></tr>
<tr><td>never</td><td> 	Deprecated in favor of using NEVER constant.</td></tr>
<tr><td>ObservableLike</td><td> 	use InteropObservable</td></tr>
<tr><td>combineLatest</td><td> 	Deprecated in favor of static combineLatest</td>.</tr>
<tr><td>concat</td><td> 	Deprecated in favor of static concat.</td></tr>
<tr><td>merge</td><td> 	Deprecated in favor of static merge.</td></tr>
<tr><td>partition</td><td> 	use `partition` static creation function instea</td>d</tr>
<tr><td>race</td><td> 	Deprecated in favor of static race.</td></tr>
<tr><td>zip</td><td> 	Deprecated in favor of static zip. </td></tr>
</table>
