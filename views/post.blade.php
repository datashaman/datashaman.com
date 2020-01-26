@extends('default')

@section('content')
<div class="pure-g">
    <div class="pure-u-1-4">
    </div>
    <div class="pure-u-3-4">
        <h1>{{ $site['title'] }}</h1>
    </div>
</div>

<article class="pure-g">
    <div class="pure-u-1-4">
        {{ $date->format('M D, H:i') }}
    </div>
    <div class="pure-u-3-4">
        <h2>
            <a href="{{ $path }}">{{ $title }}</a>
        </h2>

        {!! $excerpt ?? $contents !!}
        @if(@$excerpt)<a href="{{ $path }}">more</a>@endif
    </div>
</article>
@endsection
