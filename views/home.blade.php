@extends('default')

@section('content')
    <section>
    @foreach($posts as $post)
        <article>
            <h2><a href="{{ $post['path'] }}">{{ $post['title'] }}</a></h2>

            {!! $post['excerpt'] ?? $post['contents'] !!}

            @if(@$post['excerpt'])<a href="{{ $post['path'] }}">more</a>@endif
        </article>
    @endforeach
    </section>
@endsection
