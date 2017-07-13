@component('mail::message')
# {{ $content['title'] }}

@foreach ($content['body'] as $line)
    <p>{{ $line }}</p>
@endforeach

@component('mail::button', ['url' => $content['url'], 'color' => 'blue'])
{{ $content['button'] }}
@endcomponent

Hope to see your soon,<br>
{{ config('app.name') }} team
@endcomponent
