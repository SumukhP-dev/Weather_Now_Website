import os
import environ
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from google import genai
from gradio_client import Client, file

env = environ.Env()
environ.Env.read_env()

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

@csrf_protect
def gemini_chat_request(request):
    prompt = request.GET.get('prompt')

    client = genai.Client(api_key=GEMINI_API_KEY)
    chat = client.chats.create(model="gemini-2.5-flash-lite")

    response = chat.send_message(prompt)
    print(response.text)

    return HttpResponse(response.text)


@csrf_protect
def rag_ai_chat_request(request):
    prompt = request.GET.get('prompt')

    client = Client("Sumukhdev/weathernow-rag-model")

    data = client.predict(prompt)

    return HttpResponse(data)