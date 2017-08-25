import underthesea as uts
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from underthesea.dictionary import Dictionary
import json


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def word_sent(request):
    result = {}
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        tags = uts.word_sent(text)
        result["output"] = tags
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)

@csrf_exempt
def pos_tag(request):
    result = {}
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        tags = uts.pos_tag(text)
        result["output"] = tags
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)

@csrf_exempt
def chunking(request):
    result = {}
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        tags = uts.chunk(text)
        result["output"] = tags
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)

@csrf_exempt
def dictionary(request):
    result = {}
    uts_dict = Dictionary.Instance()
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        word = uts_dict.lookup(text)
        result["output"] = word
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)
