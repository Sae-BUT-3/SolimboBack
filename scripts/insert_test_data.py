import random
import requests
import mysql.connector
import faker


def getRandomImageURL():
    baseUrl = 'https://ozgrozer.github.io/100k-faces'
    folder = random.randint(0, 9)
    val = random.randint(0,999)
    file = f"00{folder}{'000'[len(str(val)):] + str(val)}"

    return f"{baseUrl}/0/{folder}/{file}.jpg"



def insertUser(cursor,pseudo,password,bio):
    
    try:
        photo = getRandomImageURL()
        user_id = None
        date = faker.Faker().date_between(start_date='-1y', end_date='today')
        data_to_insert = {
            "pseudo": pseudo,
            "alias": pseudo,
            "password": password,
            "email": f"{pseudo}.{pseudo}@gmail.com",
            "photo": photo,
            "bio": bio,
            "confirmed": 1,
            "id_role": 1,
            "createdAt": date,
            "updatedAt": date,
            "is_private":  1 if random.random() <0.5  else 0
        }
        insert_query = """
            INSERT INTO utilisateur 
            (pseudo, alias, password, email, photo, bio, confirmed, id_role,createdAt,updatedAt,is_private) 
            VALUES (%(pseudo)s, %(alias)s, %(password)s, %(email)s, %(photo)s, %(bio)s,%(confirmed)s, %(id_role)s,%(createdAt)s, %(updatedAt)s,%(is_private)s)
        """
    # Exécuter la requête d'insertion avec les données
        cursor.execute(insert_query, data_to_insert)
        # Récupérer l'ID de l'utilisateur créé
        user_id = cursor.lastrowid
        print("insert")
    except Exception as err:
        print(f"Erreur lors de l'insertion dans la base de données : {err}")
 
    return user_id

def insert_follow(cursor,ids,artists):
    date = faker.Faker().date_between(start_date='-1y', end_date='today')
    for artist in artists:
        data_to_insert = {
            "createdAt": date,
            "updatedAt": date,
            "nb_suivis": 0,
            "id_artiste": artist,
        }
        try:
            insert_reponse = """
                INSERT INTO `artiste`(`nb_suivis`,`id_artiste`, `createdAt`, `updatedAt` ) 
                VALUES (%(nb_suivis)s,%(id_artiste)s,%(createdAt)s,%(updatedAt)s)
            """
            cursor.execute(insert_reponse, data_to_insert)
        except Exception as err:
            print(f"Artist already exist")
    for artist in artists:
        for id_utilisateur in ids:
            if(random.random() > 0.85): continue
            data_to_insert = {
                "createdAt": date,
                "updatedAt": date,
                "id_utilisateur": id_utilisateur,
                "id_artiste": artist,
            }
            insert_reponse = """
                INSERT INTO `follow`(`id_utilisateur`,`id_artiste`, `createdAt`, `updatedAt` ) 
                VALUES (%(id_utilisateur)s,%(id_artiste)s,%(createdAt)s,%(updatedAt)s)
            """
            cursor.execute(insert_reponse, data_to_insert)
def putReponse(cursor,reponse,ids, review_ids):
    reponse_ids = []
    for i in range(len(review_ids)):
        i = review_ids
        rid = None
        for y in range(random.randint(0,5)):
            date = faker.Faker().date_between(start_date='-1y', end_date='today')
            data_to_insert = {
                "description": random.choice(reponse),
                "createdAt": date,
                "updatedAt": date,
                "id_utilisateur": random.choice(ids),
                "id_review": review_ids[y],
                "id_reponse": rid,
            }
            insert_reponse = """
                INSERT INTO `commentaire`(`description`, `id_review`,`id_utilisateur`,`id_reponse`, `createdAt`, `updatedAt` ) 
                VALUES (%(description)s,%(id_review)s,%(id_utilisateur)s,%(id_reponse)s,%(createdAt)s,%(updatedAt)s)
            """
            cursor.execute(insert_reponse, data_to_insert)
            rid = cursor.lastrowid
            reponse_ids.append(rid)
    return reponse_ids
def putReview(cursor,review, ids,track_ids):
    review_ids = []
    for i in range(len(ids)):
        if(random.random() < 0.5):
            date = faker.Faker().date_between(start_date='-1y', end_date='today')
            data_to_insert = {
                "description": random.choice(review),
                "note": random.randint(0,5),
                "createdAt": date,
                "updatedAt": date,
                "id_utilisateur": ids[i],
                "id_oeuvre": random.choice(track_ids),
                "id_type_review": 1
            }
            insert_review = """
                INSERT INTO `review`(`description`, `note`, `createdAt`, `updatedAt`, `id_utilisateur`,`id_oeuvre`,`id_type_review`) 
                VALUES (%(description)s,%(note)s,%(createdAt)s,%(updatedAt)s,%(id_utilisateur)s,%(id_oeuvre)s,%(id_type_review)s)
            """
            cursor.execute(insert_review, data_to_insert)
            # Récupérer l'ID de l'utilisateur créé
            review_ids.append(cursor.lastrowid)
    return review_ids    
def putLikesReview(cursor,ids,review_ids):
    for i in range(len(review_ids)):
        for y in range(len(ids)):
            if(random.random() <0.2): continue
            date = faker.Faker().date_between(start_date='-1y', end_date='today')
            data_to_insert = {
                "createdAt": date,
                "updatedAt": date,
                "id_utilisateur": ids[y],
                "id_review": review_ids[i],
                
            }
            insert_query = """
                INSERT INTO `like_review`(`id_utilisateur`, `id_review`, `createdAt`, `updatedAt`) 
                VALUES (%(id_utilisateur)s,%(id_review)s,%(createdAt)s,%(updatedAt)s)
            """
            cursor.execute(insert_query, data_to_insert)


def putLikesReponse(cursor,ids,reponse_ids):
    for i in range(len(reponse_ids)):
        for y in range(len(ids)):
            if(random.random() <0.2): continue
            date = faker.Faker().date_between(start_date='-1y', end_date='today')
            data_to_insert = {
                "createdAt": date,
                "updatedAt": date,
                "id_utilisateur": ids[y],
                "id_com": reponse_ids[i],
                
            }
            insert_query = """
                INSERT INTO `like_commentaire`(`id_utilisateur`, `id_com`, `createdAt`, `updatedAt`) 
                VALUES (%(id_utilisateur)s,%(id_com)s,%(createdAt)s,%(updatedAt)s)
            """
            cursor.execute(insert_query, data_to_insert)

def insert_relation(cursor,ids):
    validation = {}
    date = faker.Faker().date_between(start_date='-1y', end_date='today')
    for i in range(len(ids)):
        for y in range(len(ids)):
            if(i == y or random.random() < 0.4):
                continue
            en_attente = 1
            if(f"key-{y}-{i}" in validation):
                en_attente = 0
                validation[f"key-{y}-{i}"][0]['en_attente'] = 0
            data_to_insert = {
                "en_attente": en_attente,
                "id_utilisateur": ids[i],
                "amiIdUtilisateur": ids[y],
                "createdAt": date,
                "updatedAt": date,
            }
            insert_query = """
                INSERT INTO amis 
                (en_attente,id_utilisateur, amiIdUtilisateur, createdAt,updatedAt) 
                VALUES (%(en_attente)s, %(id_utilisateur)s, %(amiIdUtilisateur)s, %(createdAt)s, %(updatedAt)s)
            """
            validation[f"key-{i}-{y}"] = [data_to_insert,insert_query]
        # Récupérer l'ID de l'utilisateur créé
            
    for value in validation.values():
        try:
            cursor.execute(value[1], value[0])
        except Exception as err:
                print(f"Erreur lors de l'insertion dans la base de données : {err}")
    
def obtenir_prenoms_aleatoires(nombre):
    # Remplacez l'URL de l'API par celle que vous souhaitez utiliser
    api_url = f"https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/liste_des_prenoms/records?select=prenoms&limit=100&offset={random.randint(0,10000)}"
    try:
        # Effectuer la requête à l'API
        reponse = requests.get(api_url)
        # Vérifier si la requête a réussi (code de statut 200)
        if reponse.status_code == 200:
            # Extraire les prénoms de la réponse JSON
            prenoms_api = reponse.json()
            # Sélectionner un échantillon aléatoire de prénoms
            sample = [x["prenoms"] for x in prenoms_api["results"]]
            prenoms_aleatoires = random.sample(sample, min(nombre, len(sample)))
            return prenoms_aleatoires
        else:
            print(f"Erreur lors de la requête à l'API. Code de statut : {reponse.status_code}")
    except Exception as e:
        print(f"Erreur lors de la requête à l'API : {e}")

n = 50
biographies = [
    "Explorateur du monde en 150 caractères. Passionné de voyages, de cultures et de moments uniques.  #LifeExplorer",
    "Artiste en herbe, créant des chefs-d'œuvre avec chaque coup de pinceau.  #ArtLife #PassionCréative",
    "Architecte de la vie, construisant des rêves un jour à la fois.  #DreamBuilder #LifeArchitect",
    "Mordu de fitness, repoussant mes limites chaque jour.  #FitLife #ChallengeAccepted",
    "Globe-trotteur intrépide, capturant des souvenirs partout où je vais.  #Wanderlust #AdventureSeeker",
    "Amateur de mots, jonglant avec les lettres pour créer des univers magiques.  #WordWizard #Storyteller",
    "Explorateur culinaire, découvrant de nouveaux plaisirs gustatifs.  #FoodieAdventures #TasteExplorer",
    "Passionné de tech, naviguant à travers le monde numérique.  #TechEnthusiast #DigitalNomad",
    "Danseur de la vie, rythmant chaque moment avec grâce et énergie.  #DanceLife #JoyfulRhythms",
    "Aventurier des étoiles, explorant l'univers avec curiosité.  #Stargazer #CosmicExplorer",
    "Éco-warrior, défenseur de notre planète. #GreenLiving #EarthDefender",
    "Exploratrice du bien-être, cultivant l'harmonie intérieure.  #WellnessJourney #MindfulLiving",
    "Ingénieur du bonheur, construisant des ponts vers la joie.  #HappinessEngineer #PositiveVibesOnly",
    "Mélomane moderne, explorant les notes du passé et du présent.  #MusicExplorer #HarmonySeeker",
    "Maître des codes, tissant des histoires à travers le langage binaire. #CodeArtisan #DigitalStoryteller"
]

# Afficher la liste complète
reviews_musicales = [
    "Une symphonie transcendante qui emporte l'auditeur dans un voyage émotionnel profond.  #ChefDOeuvre #MusiqueClassique",
    "Des rythmes hypnotiques qui font vibrer l'âme, une expérience musicale inoubliable.  #GrooveIntense #MusiqueDuMonde",
    "Des paroles poignantes qui capturent l'esprit de toute une génération. #TextesProfonds #ChansonEngagée",
    "Un mélange parfait de mélodies envoûtantes et de beats entraînants. #VibesPositives #PopPerfection",
    "Une performance vocale à couper le souffle, une véritable démonstration de talent. #VoixExceptionnelle #SoulfulSounds",
    "Des accords de guitare envoûtants qui créent une atmosphère intime et captivante. #AcousticMagic #FolkVibes",
    "Innovation sonore à son apogée, repoussant les limites de l'expérimentation musicale. #AvantGarde #SoundExploration",
    "Un album qui transcende les genres, une fusion audacieuse de styles musicaux. #GenreBlending #Eclectique",
    "Des harmonies célestes qui transportent l'auditeur dans un état de béatitude. #HarmonieParfaite #AmbianceCéleste",
    "Des beats percutants et des paroles incisives, un manifeste musical de rébellion.  #RythmesEngagés #RebelAttitude",
    "Une expérience auditive immersive, chaque morceau est une aventure sensorielle unique.  #SonEn3D #AudioExpérience",
    "Un crescendo émotionnel qui éveille les passions les plus profondes.  #ÉmotionsIntenses #CrescendoEmotionnel",
    "Des arrangements subtils qui capturent l'essence de la nostalgie d'une époque révolue.  #VintageVibes #NostalgieMusicale",
    "Des beats entraînants qui font vibrer le corps, une invitation à la piste de danse. #RythmesContagieux #DanceFloorAnthems",
    "Un tour de force musical qui transcende les générations, une œuvre intemporelle.  #MusiqueÉternelle #ClassicForever"
]

reponses_reviews = [
    "Merci pour cette superbe critique! Tellement d'accord sur l'impact émotionnel de cette symphonie. #PartageonsNosÉmotions",
    "Ces rythmes m'ont aussi transporté! On devrait tous explorer davantage la diversité musicale du monde. #MusiqueUniverselle",
    "Les paroles de cette chanson m'ont vraiment touché. La musique peut être une force puissante pour le changement. #PowerOfLyrics",
    "D'accord à 100%! Les vibes positives de cet album sont exactement ce dont on a besoin. #SpreadJoy #MusicLover",
    "Sa voix est une merveille! Tellement d'émotion derrière chaque note.  #VoixInoubliable #MusicalSoulmate",
    "J'aime ces accords de guitare! Ils créent une ambiance si chaleureuse et authentique.  #AcousticMagic #FolkVibesForever",
    "Absolument, l'innovation sonore est si rafraîchissante. On a besoin de plus d'expérimentation dans la musique!  #PushingBoundaries",
    "Je suis totalement d'accord avec cette analyse! La fusion de genres est une véritable prouesse artistique. #EclectiqueForever",
    "Ces harmonies sont vraiment transcendantes. Chaque écoute est une expérience méditative.  #MusiqueMystique #AudioPhile",
    "Les paroles engagées résonnent vraiment avec moi. La musique peut être un moyen puissant de transmettre un message.  #MusicActivism",
    "Tu as décrit parfaitement cette expérience immersive! On se sent transporté à chaque écoute.  #AudioVoyage #SonicDreams",
    "Le crescendo émotionnel est époustouflant! On ressent chaque montée et descente de l'émotion.  #CrescendoMagique #EmotionalJourney",
    "Tellement vrai! Les arrangements subtils ajoutent une couche de nostalgie et d'authenticité.  #VintageVibes #TimelessTunes",
    "J'ai dansé toute la nuit sur ces beats entraînants! La musique a le pouvoir de rassembler les gens sur la piste de danse. #MusicUnity",
    "L'œuvre intemporelle transcende vraiment les générations. Un chef-d'œuvre qui restera gravé dans l'histoire musicale. #ClassicMasterpiece",
    "Merci pour cette critique passionnée! Il est génial de voir tant d'enthousiasme pour la musique.  #MusicEnthusiast #KeepListening"
]

track_ids = [
    "0wJoRiX5K5BxlqZTolB2LD",
    "2AxCeJ6PSsBYiTckM0HLY7",
    "0NWPxcsf5vdjdiFUI8NgkP",
    "1Eolhana7nKHYpcYpdVcT5",
    "1ntxpzIUbSsizvuAy6lTYY",
    "23MrkN7g6Q5U7GLIxNHN1B",
    "0auKlivXpm76wR63mMJ3pR",
    "5uDpwSGjljhIgDB1ZYdp9c",
    "5LI7PoHEolR8plrf3I16sq",
    "5H6Jp0syB5yEPk7SWYdlmk",
]

artists = [
    '6mEQK9m2krja6X1cfsAjfl',
    '7yeFMUrYTY5cAZx0GKXnti',
    '7Ln80lUS6He07XvHI8qqHH',
    '13ubrt8QOOCPljQ2FL1Kca',
    '711MCceyCBcFnzjGY4Q7Un',
    '3QVolfxko2UyCOtexhVTli'
]
pseudo = obtenir_prenoms_aleatoires(n)
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="spotify",
    port=3306
)

print("-------------INSERT USERS----------------------")
password = "$2b$10$feqJS.qjWmoYovS805Mmhu.7VjOncR68em0Bu4LSxS/4tDSP8HWK2"
ids = []
cursor = conn.cursor()
for data in pseudo:
    id = insertUser(cursor,data,password,random.choice(biographies))
    if(id is not None):
        ids.append(id)

print("-------------INSERT FOLLOW----------------------")
insert_follow(cursor,ids,artists)
print("-------------INSERT RELATIONS----------------------")
insert_relation(cursor,ids)

print("-------------INSERT REVIEWS----------------------")
review_ids = putReview(cursor,reviews_musicales,ids,track_ids)
putLikesReview(cursor,ids,review_ids)
print("-------------INSERT COMMENT----------------------")
reponse_ids = putReponse(cursor, reponses_reviews,ids,review_ids)
putLikesReponse(cursor,ids,reponse_ids)
conn.commit()

