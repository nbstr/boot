#===============================================
# TEST // DECRYPTER LE MESSAGE D'EXERCICE
#
# Ie simlm \ wehvWarwmrmVw@ahrh \ hkrym#
#
# Edward Snowden is hiding in Russia
#
#===============================================

import sys

#===============================================
# FONCTIONS
#===============================================
def line():
    """
    Affiche de belles séparations entre le programme et les lignes de commande.
    """
    print("\n" + "#"*30 + "\n")

def main(a, ks, kp, m):
	"""
	Racine du programme, c'est ici que tout commence
	"""

	if(a[0] == "d"): # DECRYT
		return (substitution(permutation(m, kp, False), ks, False))
	# par défaut, on encypt le message.
	else: # ENCRYPT
		return permutation(substitution (m, ks, True), kp, True)

def substitution(m, ks, a):
    """
    Effectue une substitution sur un message.
    """

    message_sub = list()

    for c in m:
    	# TYPE DE CARACTERE
    	if (c.isalpha() and c.islower()): # LETTRE MINUSCULE
    		c_list = alpha_min
    	elif (c.isalpha()): # LETTRE MAJUSCULE
    		c_list = alpha_maj
    	elif (c.isnumeric()): # CHIFFRE
    		c_list = alpha_num
    	else: # ON NE SUBSTITUE PAS LES AUTRES CARACTERES
    		message_sub.append(c)
    		continue

    	# SUBSTITUTION
    	if (a): # ENCRYPT
    		if ((c_list.index(c) + ks) > len(c_list) - 1): # on doit revenir au début
    			message_sub.append(c_list[c_list.index(c) + ks - len(c_list)])
    		else:
    			message_sub.append(c_list[c_list.index(c) + ks])

    	else: # DECRYPT
    		if ((c_list.index(c) - ks) < 0): # on doit revenir a la fin
    			message_sub.append(c_list[c_list.index(c) - ks + len(c_list)])
    		else:
    			message_sub.append(c_list[c_list.index(c) - ks])
    else:
    	return ''.join(message_sub)

def padding (input, kp, a):
   	"""
   	Met en place le padding pour avoir assez de caracteres pour la permutation
   	"""

   	# DECRYPT
   	if (not a):
   		if ("@#" in input):
   			return input[:input.index("@#")]
   		else:
   			return input

   	# ENCRYPT
   	if (len(input) % kp == 0): # MULTIPLE?
   		# return input
   		pass

   	output = input + "@#"
   	if (len(output) % kp == 0): # MULTIPLE?
   		return output

   	x = kp - (len(output) % kp)
   	output = output + x*"#"

   	return output

def permutation (input, kp, a):
	"""
	Permute un message
	"""

	# DECRYPT
	if(not a):

		if (len(input)%kp != 0):
			print ("\nLes clés et le message sont incompatibles\n")

		output = list()

		for i in range(0, int(len(input)/kp)):
			for x in range(0, kp):
				output.append(input[x*int(len(input)/kp):(x+1)*int(len(input)/kp)][i])
		else:
			return padding(''.join(output), kp, a)

	# ENCRYPT
	else:
		# PADDING
		input = padding(input, kp, a)
		output = list()
	
		for i in range(0, kp):
			for x in range(0, int(len(input)/kp)):
				output.append(input[x*kp + i])
		else:
			return ''.join(output)



    
#===============================================
# METTRE EN PLACE LES VARIABLES
#===============================================
alpha_min = list('abcdefghijklmnopqrstuvwxyz')
alpha_maj = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
alpha_num = list('0123456789')

action = sys.argv[1]
key_sub = int(sys.argv[2])
key_per = int(sys.argv[3])

# MESSAGE DE PLUS D'UN MOT:
message = list()
for x in range(4, len(sys.argv)):
    message.append(sys.argv[x])
else:
	message = ' '.join(message)

#===============================================
#  MAIN
#===============================================
line()
print (main(action, key_sub, key_per, message))
line()