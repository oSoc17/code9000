@component('mail::message')
# {{ $content['title'] }}

{{ $content['body'] }}

@component('mail::button', ['url' => $content['url'], 'color' => 'blue'])
{{ $content['button'] }}
@endcomponent

Hope to see your soon,<br>
{{ config('app.name') }} team
@endcomponent
