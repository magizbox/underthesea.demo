import underthesea as uts
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from underthesea.dictionary import Dictionary
from underthesea.classification import bank
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
def ner(request):
    result = {}
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        tags = uts.ner(text)
        result["output"] = tags
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)

@csrf_exempt
def classification(request):
    result = {}
    try:
        params = json.loads(request.body.decode("utf-8"))
        if params["domain"] == "GENERAL":
            clf = uts.classify
        if params["domain"] == "BANK":
            clf = uts.classification.bank.classify
        tags = clf(params["text"])
        result["output"] = tags
    except:
        result = {"error": "Bad request!"}
    return JsonResponse(result)

@csrf_exempt
def act(request):
    result = {}
    try:
        text = json.loads(request.body.decode("utf-8"))["text"]
        tags = uts.identify_dialog_act(text)
        result["output"] = tags
    except:
        result = {"output": ["Thanks"]}
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
